import { Page } from '@pckg/@inertiajs/inertia';
import { usePage } from '@pckg/@inertiajs/inertia-react';
import { InertiaSharedProps } from '@blazervel-ui/react/jetstream/types';

export default function useTypedPage<T = {}>() {
  return usePage<Page<InertiaSharedProps<T>>>();
}
