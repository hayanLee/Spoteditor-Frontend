import PenIcon from '@/components/Icons/PenIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import DeleteAccountConfirmButton from '@/features/profile-setting/DeleteAccountConfirmButton';
import SaveProfileButton from '@/features/profile-setting/SaveProfileButton';
import PageLayout from '@/layouts/PageLayout';

function ProfileSetting() {
  return (
    <PageLayout className="">
      <div className="web:w-[661px] mobile:w-screen flex flex-col mobile:px-[16px]">
        <article className=" flex justify-center mb-[32px]">
          <div className="relative">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex justify-center bg-white items-center w-[26px] h-[26px] z-10 rounded-[60px] border border-[#E5E6E8] absolute right-0 bottom-0">
              <PenIcon className="w-4 h-4 stroke-black" />
            </div>
          </div>
        </article>
        <section className="mb-[40px]">
          <p className="mb-4 form-section-heading">프로필 편집</p>
          <form className="flex flex-col gap-[20px]">
            <section className="flex flex-col form-field-border-bttom">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-[5px] form-label">
                  닉네임
                </label>
                <span className="form-count">14/30</span>
              </div>
              <input placeholder="Spoteditor-123" className="py-1" />
            </section>
            <section className="flex flex-col form-field-border-bttom">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-[5px] form-label">
                  프로필 설명
                </label>
                <span className="form-count">14/30</span>
              </div>
              <textarea
                placeholder="소소한 하루, 특별한 순간들을 기록하는 공간 ☕️ 일상의 작은 행복부터 여행의 찰나까지 🏞"
                className="py-1 break-words resize-none"
              />
            </section>
            <section className="flex flex-col form-field-border-bttom">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-[5px] form-label">
                  인스타그램
                </label>
              </div>
              <input placeholder="@" className="py-1" />
            </section>
          </form>
        </section>
        <section>
          <p className="mb-4 font-bold text-text-2xl">계정 설정</p>
          <div className="flex items-center justify-between py-[5px]">
            <p className="form-label">계정 삭제</p>
            <DeleteAccountConfirmButton />
          </div>
          <p className="text-primarySlate font-12 leading-[18px] font-medium">
            계정 삭제시 등록된 로그는 삭제되지 않습니다. <br /> 로그를 삭제하시려면 개별 삭제를
            해주세요.
          </p>
        </section>
        <section className="flex justify-between mt-[50px]">
          <Button variant="outline" className="rounded-[6px] w-[120px] h-[42px]">
            취소
          </Button>
          <SaveProfileButton />
        </section>
      </div>
    </PageLayout>
  );
}

export default ProfileSetting;
