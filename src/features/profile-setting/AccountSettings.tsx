import DeleteAccountConfirmButton from '@/features/profile-setting/DeleteAccountConfirmButton';

export default function AccountSettings() {
  return (
    <section className="mt-10">
      <p className="mb-4 font-bold text-text-lg web:text-text-2xl">계정 설정</p>
      <div className="flex items-center justify-between py-[5px]">
        <p className="form-label">계정 삭제</p>
        <DeleteAccountConfirmButton />
      </div>
      <p className="font-medium text-primarySlate text-text-xs">
        계정 삭제시, 등록된 로그는 모두 영구삭제됩니다.
      </p>
    </section>
  );
}
