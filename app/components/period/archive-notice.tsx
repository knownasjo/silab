export default function ArchiveNotice({ name }: { name: string }) {
  return (
    <p
      role="status"
      className="rounded-xl bg-[#FFF8DD] p-3 text-sm font-semibold text-[#B58100]"
    >
      Periode {name} sudah selesai, data hanya bisa dilihat.
    </p>
  );
}
