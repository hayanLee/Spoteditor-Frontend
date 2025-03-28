interface NoticeDetailContentProps {
  content: string;
}

function NoticeDetailContent({ content }: NoticeDetailContentProps) {
  return (
    <section className="flex px-4 py-10">
      <span className="font-medium text-text-sm text-primary-600">{content}</span>
    </section>
  );
}

export default NoticeDetailContent;
