import data from '@/schemas/footer-copyright.json';

export type FooterCopyrightItemType = {
  copyright: string;
};

export default async function FooterCopyright() {
  return (
    <div>
      <span className="">{data?.copyright}</span>
    </div>
  );
}
