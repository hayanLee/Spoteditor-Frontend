interface NoticeDetailContentProps {
  content: string;
}

function NoticeDetailContent({ content }: NoticeDetailContentProps) {
  return (
    <section className="flex px-4 py-2.5">
      <span className="font-medium leading-6 text-[14px] text-primary-600">{content}</span>
    </section>
  );
}

export default NoticeDetailContent;
