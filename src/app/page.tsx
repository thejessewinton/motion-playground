import { Shader } from '~/components/shader';
import { Switchboard } from '~/components/switchboard';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-10">
      <Shader />
      <Switchboard />
    </div>
  );
}
