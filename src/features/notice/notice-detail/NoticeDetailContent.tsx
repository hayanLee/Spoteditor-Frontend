interface NoticeDetailContentProps {
  content: string;
}

function NoticeDetailContent({ content }: NoticeDetailContentProps) {
  return (
    <section className="flex px-4 py-10 border-t-[1px] border-t-primary-50">
      <span className="font-medium leading-[23.8px] text-[14px] text-primary-600 ">{content}</span>
    </section>
  );
}

export default NoticeDetailContent;
