import { DieFace } from "@/components/dice/DieFace/DieFace";
import { AlignBottom } from "@/components/three/AlignBottom";
import { CSG } from "@/components/three/csg/CSG";
import { MaterialsContext } from "@/contexts";
import { useExportSettings } from "@/stores/ExportSettingsStore";
import { cad2brush } from "@/utils/cad2three";
import { decompose } from "@/utils/decompose";
import { getInstanceFaceInfo } from "@/utils/faces/getInstanceFaceInfo";
import { getFirstItem } from "@/utils/getFirstItem";
import { Box } from "@react-three/flex";
import { FC, useContext, useMemo } from "react";
import { Matrix4 } from "three";
import { ADDITION, SUBTRACTION } from "three-bvh-csg";
import { DieInfo } from "./utils/types";

export interface AbstractDieProps {
  info: DieInfo;
}

export const AbstractDie: FC<AbstractDieProps> = ({ info }) => {
  const { visible, size, fontScale, extraOptions } = info.useStore();

  const baseGeom = useMemo(() => {
    return info.config.base({ size, ...extraOptions });
  }, [extraOptions, info.config, size]);

  const facesGeom = useMemo(() => {
    return info.config.facesBase?.({ size, ...extraOptions });
  }, [extraOptions, info.config, size]);

  const { baseMaterial } = useContext(MaterialsContext);

  const baseBrush = useMemo(() => {
    return cad2brush(baseGeom, baseMaterial);
  }, [baseGeom, baseMaterial]);

  const renderMode = useExportSettings((store) => store.renderMode);
  const renderOperation = useExportSettings((store) => store.renderOperation);

  const enableAlign = renderMode === "STL";

  const alignMatrix = useMemo(() => {
    if (!enableAlign) return null;

    const alignFaceConfig = info.config.faces[info.config.alignFaceIndex ?? -1];

    if (!alignFaceConfig) return null;

    const instance = getFirstItem(alignFaceConfig.instances);
    const faceInfo = getInstanceFaceInfo(facesGeom ?? baseGeom, instance);

    const matrix = new Matrix4().fromArray(faceInfo.rotationMatrix);

    if (info.config.invertAlignMatrix) {
      matrix.invert();
    }

    return decompose(matrix);
  }, [
    baseGeom,
    enableAlign,
    facesGeom,
    info.config.alignFaceIndex,
    info.config.faces,
    info.config.invertAlignMatrix,
  ]);

  return (
    <Box
      centerAnchor
      padding={15}
      visible={visible}
      ref={(value) => (info.object = value)}
    >
      <AlignBottom disabled={!enableAlign}>
        <group rotation-x={-Math.PI / 2}>
          <group {...alignMatrix}>
            <CSG
              operation={
                renderOperation === "Subtract" ? SUBTRACTION : ADDITION
              }
              disabled={renderMode === "Preview"}
            >
              <primitive object={baseBrush} />

              {info.faces.map((info, i) => (
                <DieFace
                  key={i}
                  info={info}
                  fontScale={fontScale}
                  geom={facesGeom ?? baseGeom}
                />
              ))}
            </CSG>
          </group>
        </group>
      </AlignBottom>
    </Box>
  );
};
