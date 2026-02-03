"use client";

export function AdBanner() {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 my-6 text-center">
      <div className="text-sm text-yellow-700 font-semibold mb-2">광고</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9991254411797769"
        data-ad-slot="4808360428"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export function AdInContent() {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 my-6">
      <div className="text-sm text-yellow-700 font-semibold mb-2">광고</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9991254411797769"
        data-ad-slot="3495278752"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export function AdBottom() {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 my-6">
      <div className="text-sm text-yellow-700 font-semibold mb-2">광고</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9991254411797769"
        data-ad-slot="7582262800"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
