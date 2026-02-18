"use client";

export default function CarViewer() {
  return (
    <model-viewer
      src="/scene.gltf"
      camera-orbit="24deg 85deg 2.8m"
      camera-target="-0.6m 0.2m 0m"
      field-of-view="30deg"
      shadow-intensity="4"
      shadow-softness="0.22"
      exposure="1"
      disable-zoom
      disable-pan
      interaction-prompt="none"
    ></model-viewer>
  );
}
