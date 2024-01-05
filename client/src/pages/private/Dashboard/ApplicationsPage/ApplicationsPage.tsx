import Button from '@/components/common/Button';
import {
  useCreateApplication,
  useGetApplications,
  useUpdateApplication,
} from '@/service/applicationService';
import { StatusEnum } from '@/types/applicationType';

export default function ApplicationsPage() {
  const { data } = useGetApplications();
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();

  const values = {
    company: 'Google',
    position: 'Front End Developer',
    description: 'Heello World',
    salary: 100000,
    location: 'Sunnvayle, CA',
    status: StatusEnum.APPLIED,
  };

  const handleCreate = () => {
    createMutation.mutate({
      company: 'Google',
      position: 'Front End Developer',
      description: 'Heello World',
      salary: 100000,
      location: 'Sunnvayle, CA',
    });
  };

  const handleUpdate = () => {
    updateMutation.mutate({ id: 120, ...values });
  };

  return (
    <>
      <Button fullWidth onClick={handleCreate}>
        Create
      </Button>
      <Button variant="outlined" fullWidth onClick={handleUpdate}>
        Update
      </Button>
      <div className="grid-cols-applications grid w-full auto-rows-fr gap-4">
        {(data?.data ?? []).map((application) => (
          <div
            key={application.id}
            className="rounded-lg bg-card-bg p-4 text-card-fg shadow-sm shadow-card-shade"
          >
            <h2 className="line-clamp-1 text-lg font-bold text-primary">
              {application.position}
            </h2>
            <p>{application.company}</p>
            <p>{application.location}</p>
          </div>
        ))}
      </div>
    </>
  );
}
