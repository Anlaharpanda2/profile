'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

const PUBLISHER_ID = 'ca-pub-4348406121095343';

/**
 * GoogleAdsense Component
 * 
 * This component conditionally loads the Google AdSense script
 * ONLY when the user is on a /blog/* route.
 * 
 * Returns null for homepage (/) and all non-blog pages.
 */
export default function GoogleAdsense() {
    const pathname = usePathname();

    // Don't load ads in development environment
    if (process.env.NODE_ENV !== 'production') {
        return null;
    }

    // // Only load AdSense on blog pages
    // if (!pathname.startsWith('/blog')) {
    //     return null;
    // }

    return (
        <Script
            id="google-adsense"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
        />
    );
}
