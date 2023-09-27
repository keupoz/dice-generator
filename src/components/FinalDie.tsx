import { MaterialsContext } from "@/contexts";
import { DieFaceConfig } from "@/hooks/useDieFace";
import { useExportSettings } from "@/stores/ExportSettingsStore";
import { alignMesh } from "@/utils/alignMesh";
import { cad2brush } from "@/utils/cad2three";
import { getInstanceFaceInfo } from "@/utils/faces/getInstanceFaceInfo";
import { getFirstItem } from "@/utils/getFirstItem";
import { setRef } from "@/utils/setRef";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { Box } from "@react-three/flex";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { Group, Matrix4, Object3D } from "three";
import { ADDITION, Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";

export interface FinalDieProps {
  geom: Geom3;
  faces: Brush[][];
  hidden: boolean;
  facesGeom?: Geom3;
  alignFaceConfig?: DieFaceConfig;
  invertMatrix?: boolean;
}

const EVALUATOR = new Evaluator();

export const FinalDie = forwardRef<Object3D, FinalDieProps>(
  ({ geom, faces, hidden, facesGeom, alignFaceConfig, invertMatrix }, ref) => {
    const { baseMaterial } = useContext(MaterialsContext);

    const baseBrush = useMemo(() => {
      return cad2brush(geom, baseMaterial);
    }, [baseMaterial, geom]);

    const renderMode = useExportSettings((store) => store.renderMode);
    const renderOperation = useExportSettings((store) => store.renderOperation);

    const finalGroup = useMemo(() => {
      if (hidden) return null;

      const group = new Group();

      if (renderMode === "Preview") {
        group.add(baseBrush, ...faces.flat());

        return group;
      }

      const operation = renderOperation === "union" ? ADDITION : SUBTRACTION;

      let result = baseBrush;

      result.removeFromParent();
      result.updateMatrixWorld();

      for (const face of faces.flat()) {
        face.removeFromParent();
        face.updateMatrixWorld();

        result = EVALUATOR.evaluate(result, face, operation);
      }

      if (renderMode === "STL") {
        if (alignFaceConfig) {
          const instance = getFirstItem(alignFaceConfig.instances);
          const info = getInstanceFaceInfo(facesGeom ?? geom, instance);

          let matrix = new Matrix4().fromArray(info.rotationMatrix);

          if (invertMatrix) {
            matrix = matrix.invert();
          }

          result.applyMatrix4(matrix);
          result.updateMatrixWorld();
        }

        alignMesh({ modes: ["none", "none", "min"] }, result);
      }

      group.add(result);

      return group;
    }, [
      hidden,
      renderMode,
      renderOperation,
      baseBrush,
      faces,
      alignFaceConfig,
      facesGeom,
      geom,
      invertMatrix,
    ]);

    useEffect(() => {
      setRef(ref, finalGroup);

      return () => {
        setRef(ref, null);
      };
    }, [finalGroup, ref]);

    return (
      <Box padding={15} centerAnchor>
        {finalGroup && <primitive object={finalGroup} />}
      </Box>
    );
  }
);
