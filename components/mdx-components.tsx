import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { CopyButton } from './copy-button';

export const mdxComponents = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  pre: ({ children, ...props }: any) => {
    const codeContent = children?.props?.children || '';
    return (
      <div className="relative my-6">
        <CopyButton text={codeContent} />
        <pre {...props} className="border border-gray-200 rounded-lg p-4 overflow-x-auto">
          {children}
        </pre>
      </div>
    );
  },
  code: ({ children, className }: any) => {
    if (className) {
      return <code className={className}>{children}</code>;
    }
    return <code className="px-1.5 py-0.5 bg-pink-50 text-pink-600 rounded text-sm font-mono border border-pink-100">{children}</code>;
  },
  ImageViewer: ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <figure className="my-8">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && <figcaption className="text-center text-sm text-gray-600 mt-2">{caption}</figcaption>}
    </figure>
  ),
};
