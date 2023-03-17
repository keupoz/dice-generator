import { Accessor, createEffect, onCleanup } from "solid-js";
import {
  AmbientLight,
  BoxHelper,
  GridHelper,
  Intersection,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export type AddObjects = (...objects: Object3D[]) => void;
export type Init = () => void;
export type CreateThreeResult = [
  domElement: HTMLCanvasElement,
  addObjects: AddObjects,
  init: Init,
  render: () => void
];

export function createThree(showGrid: Accessor<boolean>): CreateThreeResult {
  const renderer = new WebGLRenderer();

  const camera = new PerspectiveCamera();
  const controls = new OrbitControls(camera, renderer.domElement);
  const scene = new Scene();

  const pointerVector = new Vector2();
  const raycaster = new Raycaster();
  const highlight = new BoxHelper(new Object3D(), 0xffffff);

  const ambientLight = new AmbientLight(0x7f7f7f);
  const pointLight = new PointLight(0x7f7f7f);

  const grid = new GridHelper(256, 256, 0x1f1f1f, 0x3f3f3f);

  let currentIntersection: Intersection | null = null;

  raycaster.layers.mask = 0b10;

  createEffect(() => {
    grid.visible = showGrid();
    render();
  });

  function updateLight() {
    pointLight.position.copy(camera.position);
    render();
  }

  function setSize(width: number, height: number) {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    render();
  }

  function updateSize() {
    const element = renderer.domElement.parentElement ?? renderer.domElement;

    setSize(element.offsetWidth, element.offsetHeight);
  }

  function render() {
    renderer.render(scene, camera);
  }

  const addObjects: AddObjects = (...objects) => {
    scene.add(...objects);
    render();
  };

  const init: Init = () => {
    scene.add(ambientLight, pointLight, grid);

    camera.position.set(24, 24, 24);
    camera.lookAt(0, 0, 0);

    updateLight();

    window.addEventListener("resize", updateSize);
    controls.addEventListener("change", updateLight);

    renderer.domElement.addEventListener("dblclick", (e) => {
      e.preventDefault();
      updateFocus();
    });

    renderer.domElement.addEventListener("mousemove", (e) => {
      updatePointer(e);
    });

    renderer.domElement.addEventListener("touchmove", (e) => {
      const touch = e.changedTouches[0];

      if (touch === undefined) {
        throw new Error("Unexpected condition");
      }

      updatePointer(touch);
    });

    updateSize();
  };

  function updateHighlight(): void {
    raycaster.setFromCamera(pointerVector, camera);

    const [intersection] = raycaster.intersectObjects(scene.children);

    if (intersection === undefined) {
      scene.remove(highlight);
      currentIntersection = null;
    } else {
      highlight.setFromObject(intersection.object).update();
      scene.add(highlight);
      currentIntersection = intersection;
    }

    render();
  }

  function updatePointer(pointer: { clientX: number; clientY: number }): void {
    const { top, left, width, height } =
      renderer.domElement.getBoundingClientRect();

    pointerVector.x = ((pointer.clientX - left) / width) * 2 - 1;
    pointerVector.y = (-(pointer.clientY - top) / height) * 2 + 1;

    updateHighlight();
  }

  function updateFocus() {
    if (currentIntersection === null) {
      resetFocus();

      return;
    }

    setFocus(getHighlightCenter());
  }

  function resetFocus() {
    setFocus(new Vector3());
  }

  function setFocus(target: Vector3) {
    controls.target.copy(target);
    controls.update();
  }

  function getHighlightCenter(): Vector3 {
    let boundingSphere = highlight.geometry.boundingSphere;

    if (boundingSphere === null) {
      highlight.geometry.computeBoundingSphere();

      boundingSphere = highlight.geometry.boundingSphere;
    }

    if (boundingSphere === null) {
      throw new Error("Can't compute highlight bounding sphere");
    }

    return boundingSphere.center;
  }

  onCleanup(() => {
    renderer.dispose();
  });

  return [renderer.domElement, addObjects, init, render];
}
