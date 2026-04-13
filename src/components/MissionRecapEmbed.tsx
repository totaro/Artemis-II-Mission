import { useEffect, useRef } from 'react';

export default function MissionRecapEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the script isn't already on the page, add it
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charSet = 'utf-8';
      document.body.appendChild(script);
    } else {
      // If the script is already loaded, tell it to scan the DOM again
      // @ts-ignore
      if (window.twttr && window.twttr.widgets) {
        // @ts-ignore
        window.twttr.widgets.load(containerRef.current);
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center w-full">
      <div className="relative group w-full max-w-[800px]">
        <div className="absolute -inset-1 bg-gradient-to-r from-atmosphere to-flare opacity-20 blur-xl group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex justify-center w-full">
          <blockquote className="twitter-tweet" data-media-max-width="800" data-theme="dark">
            <p lang="en" dir="ltr">
              Let&#39;s run that back. One more time... Or two?<br/>
              Our crew is now safely back on Earth. Relive the historic mission, and keep an eye on our website as more images and videos keep rolling in. <a href="https://t.co/FoYXKVvve5">https://t.co/FoYXKVvve5</a> <a href="https://t.co/svDaL8ZXpc">pic.twitter.com/svDaL8ZXpc</a>
            </p>
            &mdash; NASA (@NASA) <a href="https://twitter.com/NASA/status/2042840027109957758?ref_src=twsrc%5Etfw">April 11, 2026</a>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
