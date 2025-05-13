import { getStreamingToken } from "@/utils/tokenhelper"

export default function Announcement() {

  return (
    <>
      { (getStreamingToken().token === '') ?
        <div className="border-b border-gray-900 bg-warning-300 px-4 py-2 text-gray-100">
            <p className="text-center font-medium">
            Xbox Cloud Gaming is currently experiencing issues. Streaming may not work as expected.
            </p>
        </div> : ''}
    </>
  );
}
