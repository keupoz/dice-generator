import { DieFace } from "@/components/dice/DieFace/DieFace";
import { AlignBottom } from "@/components/three/AlignBottom";
import { CSG } from "@/components/three/csg/CSG";
import { BASE_MATERIAL } from "@/materials";
import { useExportSettings } from "@/stores/ExportSettingsStore";
import { cad2brush } from "@/utils/cad2three";
import { getInstanceFaceInfo } from "@/utils/faces/getInstanceFaceInfo";
import { getFirstItem } from "@/utils/getFirstItem";
import { Box } from "@react-three/flex";
import { FC, useMemo } from "react";
import { getOperation } from "../three/csg/availableOperations";
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

  const baseBrush = useMemo(() => {
    return cad2brush(baseGeom, BASE_MATERIAL);
  }, [baseGeom]);

  const enableAlign = useExportSettings((store) => store.enableAlign);
  const enableRender = useExportSettings((store) => store.enableRender);
  const renderOperation = useExportSettings((store) => store.renderOperation);

  const alignMatrix = useMemo(() => {
    if (!enableAlign) return null;

    const alignFaceConfig = info.config.faces[info.config.alignFaceIndex ?? -1];

    if (!alignFaceConfig) return null;

    const instance = getFirstItem(alignFaceConfig.instances);
    const faceInfo = getInstanceFaceInfo(
      facesGeom ?? baseGeom,
      instance,
      info.config.invertAlignMatrix
    );

    return faceInfo.rotationMatrix;
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
      <AlignBottom
        disabled={!enableAlign}
        alignBy={enableRender ? null : baseBrush}
      >
        <group rotation-x={-Math.PI / 2}>
          <group {...alignMatrix}>
            <CSG
              operation={getOperation(renderOperation)}
              disabled={!enableRender}
            >
              {/* Wrapped to make its position in the tree persistent */}
              <group>
                <primitive object={baseBrush} />
              </group>

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
