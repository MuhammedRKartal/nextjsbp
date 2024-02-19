import data from '../../schemas/footer-copyright.json';

export type FooterCopyrightItemType = {
  copyright: string;
};

export default async function FooterCopyright() {
  return (
    <div>
      <span className="text-white">{data?.copyright}</span>
    </div>
  );
}
