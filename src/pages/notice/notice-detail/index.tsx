import NoticeDetailContent from '@/features/notice/notice-detail/NoticeDetailContent';
import NoticeDetailHeader from '@/features/notice/notice-detail/NoticeDetailHeader';
import NoticeDetailInfo from '@/features/notice/notice-detail/NoticeDetailInfo';

function NoticeDetail() {
  return (
    <div className="flex justify-center w-full h-[1000vh]">
      <div className="max-w-[724px] w-full">
        <NoticeDetailHeader
          title="스팟에디터 ‘서비스 이용약관’ 변경에 
대한 안내"
          time="2025.03.15"
        />
        <NoticeDetailContent
          content="안녕하세요. 스팟에디터 팀입니다. 스팟에디터를 이용해주시는 회원 여러분께 진심으로
        감사드리며, 스팟에디터 ‘서비스 이용약관’ 변경에 관한 안내 말씀 드립니다. 아래의 ‘서비스
        이용약관’ 변경사항을 확인하시고, 서비스 이용에 참고 부탁 드리겠습니다."
        />
        <section className="flex px-4 py-2.5 flex-col gap-5">
          <NoticeDetailInfo
            title="변경 일자"
            content="변경된 ‘서비스 이용약관’은 2025년 3월 30일 자로 효력이 발생됩니다."
          />
          <NoticeDetailInfo
            title="변경 내용"
            content="이메일 주소 변경에 다른 서비스 이용약관 개정"
          />
        </section>
      </div>
    </div>
  );
}

export default NoticeDetail;
