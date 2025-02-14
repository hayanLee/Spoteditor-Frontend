import EmptyIcon from '@/components/Icons/EmptyIcon';

function NotNotification() {
  return (
    <section className="flex flex-col py-5 items-center px-6 gap-2.5">
      <EmptyIcon />
      <p className="text-text-xs font-medium py-2.5">아직 알림을 받지 않았어요.</p>
    </section>
  );
}

export default NotNotification;
