import {
  MotionValue,
  SpringOptions,
  useSpring,
  useTransform,
  SingleTransformer,
} from 'framer-motion';

export function useSmoothTransform(
  value: MotionValue,
  springOptions: SpringOptions,
  transformer: SingleTransformer
) {
  return useSpring(useTransform(value, transformer), springOptions);
}
