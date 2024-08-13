import { useEffect, useState } from "react";
import "./App.css";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const triggerEventSource = () => {
    const eventSource = new EventSource("http://localhost:3000/events");
    eventSource.onmessage = function (event) {
      const parsedData = JSON.parse(event.data);
      setMessage((prev) => prev.concat(parsedData.message));
      if (!parsedData.hasMore) {
        eventSource.close();
        setIsEnd(true);
        setIsTriggered(false);
      }
    };

    eventSource.onerror = function () {
      console.log("Error occurred with SSE.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  useEffect(() => {
    document.getElementById("last-view")?.scrollIntoView({
      behavior: "instant",
    });
  }, [message]);

  const handleTrigger = () => {
    setIsTriggered(true);
    triggerEventSource();
  };

  const handleRestart = () => {
    setIsEnd(false);
    setMessage("");
    handleTrigger();
  };

  return (
    <div>
      {!isTriggered && !isEnd && (
        <button onClick={handleTrigger}>Trigger Server-Sent Events</button>
      )}
      <Markdown rehypePlugins={[rehypeRaw]}>{message}</Markdown>
      {isEnd && (
        <div>
          <hr />
          <p>End of the stream</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      <div id="last-view" />
    </div>
  );
};

export default App;
