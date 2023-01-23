import { usePage } from '@pckg/@inertiajs/react';
import { InertiaSharedProps } from '@ja-inertia/types';

export default function useTypedPage<T = {}>() {
  return usePage<Page<InertiaSharedProps<T>>>();
}
