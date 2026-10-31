"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import {
  animate,
  cancelFrame,
  frame,
  motionValue,
  press,
  transformValue,
} from "motion";
import { threeEffect } from "motion/three";
import * as THREE from "three/webgpu";
import {
  attribute,
  cos,
  mix,
  positionLocal,
  sin,
  time,
  uniform,
  vec3,
} from "three/tsl";

const PHOTO_URL = "/foto.jpg";
const COLUMNS = 200;

type PhotoData = {
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
  map: THREE.Texture;
};

type Vector2Uniform = { value: THREE.Vector2 };

type ParticleSystem = {
  imageAspect: number;
  columns: number;
  rows: number;
  particleSize: Vector2Uniform;
  object: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.MeshBasicNodeMaterial>;
};

type PhotoMesh = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

function highResolutionMix(globeAmount: number) {
  const amount = Math.max(globeAmount, 0);
  const start = 0.005;
  const end = 0.035;
  const t = Math.min(1, Math.max(0, (amount - start) / (end - start)));
  return 1 - t * t * (3 - 2 * t);
}

function loadPhoto(url: string): Promise<PhotoData> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const source = document.createElement("canvas");
      source.width = image.naturalWidth;
      source.height = image.naturalHeight;

      const context = source.getContext("2d", { willReadFrequently: true });
      if (!context) {
        reject(new Error("Could not get 2D context"));
        return;
      }
      context.drawImage(image, 0, 0);

      const map = new THREE.Texture(image);
      map.colorSpace = THREE.SRGBColorSpace;
      map.needsUpdate = true;

      resolve({
        width: source.width,
        height: source.height,
        pixels: context.getImageData(0, 0, source.width, source.height).data,
        map,
      });
    };
    image.onerror = () => reject(new Error("Could not load the photograph"));
    image.src = url;
  });
}

function createParticles(
  photo: PhotoData,
  globe: THREE.Node<"float">,
): ParticleSystem {
  const imageAspect = photo.width / photo.height;
  const rows = Math.round(COLUMNS / imageAspect);
  const count = COLUMNS * rows;
  const imagePositions = new Float32Array(count * 3);
  const globePositions = new Float32Array(count * 3);
  const colours = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const color = new THREE.Color();

  for (let index = 0; index < count; index++) {
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    const sampleX = Math.min(
      photo.width - 1,
      Math.floor(((column + 0.5) / COLUMNS) * photo.width),
    );
    const sampleY = Math.min(
      photo.height - 1,
      Math.floor(((row + 0.5) / rows) * photo.height),
    );
    const pixel = (sampleY * photo.width + sampleX) * 4;
    const offset = index * 3;

    color.setRGB(
      photo.pixels[pixel] / 255,
      photo.pixels[pixel + 1] / 255,
      photo.pixels[pixel + 2] / 255,
    );
    colours[offset] = color.r;
    colours[offset + 1] = color.g;
    colours[offset + 2] = color.b;
    phases[index] = Math.random() * Math.PI * 2;
    speeds[index] = 0.7 + Math.random() * 0.35;
  }

  const geometry = new THREE.InstancedBufferGeometry().copy(
    new THREE.PlaneGeometry(1, 1) as unknown as THREE.InstancedBufferGeometry,
  );
  geometry.instanceCount = count;
  geometry.setAttribute(
    "imagePosition",
    new THREE.InstancedBufferAttribute(imagePositions, 3),
  );
  geometry.setAttribute(
    "globePosition",
    new THREE.InstancedBufferAttribute(globePositions, 3),
  );
  geometry.setAttribute(
    "colour",
    new THREE.InstancedBufferAttribute(colours, 3),
  );
  geometry.setAttribute("phase", new THREE.InstancedBufferAttribute(phases, 1));
  geometry.setAttribute("speed", new THREE.InstancedBufferAttribute(speeds, 1));

  const imagePosition = attribute("imagePosition", "vec3");
  const spherePosition = attribute("globePosition", "vec3");
  const phase = attribute("phase", "float");
  const speed = attribute("speed", "float");
  const particleSize = uniform(new THREE.Vector2(0.01, 0.01));
  const turbulence = vec3(
    sin(time.add(speed.add(0.6)).add(phase)).mul(0.045),
    cos(time.add(speed.add(0.37)).add(phase.mul(1.71))).mul(0.035),
    sin(time.add(speed.add(0.22)).add(phase.mul(2.13))).mul(0.045),
  );
  const material = new THREE.MeshBasicNodeMaterial({ toneMapped: false });

  material.colorNode = attribute("colour", "vec3");
  const particleCenter = mix(imagePosition, spherePosition.add(turbulence), globe);
  material.positionNode = particleCenter.add(
    vec3(positionLocal.xy.mul(particleSize), 0),
  );

  return {
    imageAspect,
    columns: COLUMNS,
    rows,
    particleSize,
    object: new THREE.Mesh(geometry, material),
  };
}

function createPhotoOverlay(photo: PhotoData): PhotoMesh {
  const photoMaterial = new THREE.MeshBasicMaterial({
    map: photo.map,
    toneMapped: false,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    opacity: 0,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), photoMaterial);
  mesh.renderOrder = 1;
  return mesh;
}

function layoutParticles(
  particles: ParticleSystem,
  photoMesh: PhotoMesh,
  aspect: number,
  globeYaw: number,
) {
  const { columns, imageAspect, object, particleSize, rows } = particles;
  const imageHalfHeight = Math.min(0.72, (0.86 * aspect) / imageAspect);
  const imageHalfWidth = imageHalfHeight * imageAspect;
  const globeRadius = Math.min(0.58, aspect * 0.82);
  const position = object.geometry.getAttribute(
    "imagePosition",
  ) as THREE.BufferAttribute;
  const sphere = object.geometry.getAttribute(
    "globePosition",
  ) as THREE.BufferAttribute;
  const yawCos = Math.cos(globeYaw);
  const yawSin = Math.sin(globeYaw);
  const tilt = -0.28;

  for (let index = 0; index < position.count; index++) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = (column + 0.5) / columns;
    const y = (row + 0.5) / rows;
    const sphereY = 1 - (index / Math.max(position.count - 1, 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
    const angle = index * 2.39996323;
    const sphereX = Math.cos(angle) * ringRadius;
    const sphereZ = Math.sin(angle) * ringRadius;
    const spunX = sphereX * yawCos + sphereZ * yawSin;
    const spunZ = -sphereX * yawSin + sphereZ * yawCos;

    position.setXYZ(
      index,
      (x - 0.5) * imageHalfWidth * 2,
      (0.5 - y) * imageHalfHeight * 2,
      0,
    );
    sphere.setXYZ(
      index,
      spunX * globeRadius,
      (sphereY * Math.cos(tilt) - spunZ * Math.sin(tilt)) * globeRadius,
      (sphereY * Math.sin(tilt) + spunZ * Math.cos(tilt)) * globeRadius,
    );
  }

  position.needsUpdate = true;
  sphere.needsUpdate = true;
  particleSize.value.set(
    ((imageHalfWidth * 2) / columns) * 1.01,
    ((imageHalfHeight * 2) / rows) * 1.01,
  );
  photoMesh.scale.set(imageHalfWidth * 2, imageHalfHeight * 2, 1);
}

export default function ParticleGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const stageNode = containerRef.current;
    const canvasNode = canvasRef.current;
    if (!stageNode || !canvasNode) return;

    const stageEl: HTMLDivElement = stageNode;
    const canvasEl: HTMLCanvasElement = canvasNode;

    let isMounted = true;
    let renderer: THREE.WebGPURenderer | undefined;
    let cleanupScene: (() => void) | undefined;
    let cleanupUniformEffect: (() => void) | undefined;
    let cleanupOpacityEffect: (() => void) | undefined;

    const globe = uniform(1);
    const globeValue = motionValue(1);
    const globeYaw = Math.random() * Math.PI * 2;

    async function init() {
      try {
        const activeRenderer = new THREE.WebGPURenderer({
          canvas: canvasEl,
          antialias: true,
        });
        renderer = activeRenderer;
        await activeRenderer.init();
        if (!isMounted) return;

        activeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        activeRenderer.outputColorSpace = THREE.SRGBColorSpace;

        const photo = await loadPhoto(PHOTO_URL);
        if (!isMounted) return;

        const particles = createParticles(photo, globe);
        const photoMesh = createPhotoOverlay(photo);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

        scene.background = new THREE.Color(0x0a0a0a);
        camera.position.z = 4;
        scene.add(particles.object);
        scene.add(photoMesh);

        const resize = () => {
          const width = Math.max(stageEl.clientWidth, 1);
          const height = Math.max(stageEl.clientHeight, 1);
          const aspect = width / height;

          activeRenderer.setSize(width, height, false);
          camera.left = -aspect;
          camera.right = aspect;
          camera.top = 1;
          camera.bottom = -1;
          camera.updateProjectionMatrix();
          layoutParticles(particles, photoMesh, aspect, globeYaw);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(stageEl);
        resize();

        cleanupUniformEffect = threeEffect(globe, { value: globeValue });
        cleanupOpacityEffect = threeEffect(photoMesh.material, {
          opacity: transformValue(() =>
            highResolutionMix(globeValue.get()),
          ),
        });

        animate(globeValue, 0, {
          type: "spring",
          stiffness: 55,
          damping: 16,
          mass: 1,
          delay: 0.8,
        });

        const cancelPress = press(canvasEl, () => {
          animate(globeValue, 1, {
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.9,
          });

          return () => {
            animate(globeValue, 0, {
              type: "spring",
              stiffness: 70,
              damping: 16,
              mass: 1,
            });
          };
        });

        const renderProcess = frame.render(() => {
          if (isMounted) activeRenderer.render(scene, camera);
        }, true);

        cleanupScene = () => {
          resizeObserver.disconnect();
          cancelFrame(renderProcess);
          cancelPress();
          scene.traverse((object) => {
            const mesh = object as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.geometry.dispose();
            const materials = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            for (const material of materials) {
              (material as THREE.MeshBasicMaterial).map?.dispose();
              material.dispose();
            }
          });
          scene.clear();
        };

        canvasEl.dataset.ready = "true";
        setStatus("ready");
      } catch (error) {
        if (!isMounted) return;
        console.error("WebGPU initialization error:", error);
        setStatus("error");
      }
    }

    void init();

    return () => {
      isMounted = false;
      cleanupUniformEffect?.();
      cleanupOpacityEffect?.();
      cleanupScene?.();
      try {
        renderer?.dispose();
      } catch {
        /* renderer already torn down */
      }
      delete canvasEl.dataset.ready;
    };
  }, []);

  const hint =
    status === "ready"
      ? "Press and hold to form a particle globe"
      : status === "error"
        ? "Interactive view unavailable in this browser"
        : "Loading visual...";

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[400px] w-full overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <NextImage
        src={PHOTO_URL}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 768px) 40vw, 90vw"
        className={`object-cover ${status === "ready" ? "opacity-0" : ""}`}
      />

      <canvas
        ref={canvasRef}
        role="button"
        tabIndex={0}
        aria-label="Press and hold to form a particle globe from the portrait"
        className={`absolute inset-0 block h-full w-full cursor-crosshair touch-none ${
          status === "error" ? "hidden" : ""
        }`}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-4 rounded-md border border-line bg-canvas/80 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur-sm"
      >
        {hint}
      </div>
    </div>
  );
}
