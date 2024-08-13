This article is copied from [PubNub](https://www.pubnub.com/guides/server-sent-events/)

# What are Server-Sent Events (SSE)?

![](https://www.pubnub.com/cdn/3prze68gbwl1/775FfVFcju7ApWDrQg3WDY/20f4d9ccdee1cf98a913ff9efa82a748/Server-Sent_Events-Guide.jpg?fm=avif&w=747&h=325&fit=pad)

## What are server-sent events (SSE)?

Server-Sent Events (SSE) is networking technology that allows servers to push real-time client updates over a single HTTP connection. It’s part of the HTML5 specification and provides a simple and efficient way for server applications to send data to clients. It is supported by about 97% of all browsers in the wild.

<video src="//videos.ctfassets.net/3prze68gbwl1/7320VUMMXK81tIglNPqVkd/8bf287c5a8ce6cf07826e7843a06a381/What_is_Server-Sent-Events_SSE_Protocol_.mp4" preload="auto" controls="" style="width: 100%; height: 100%;"></video>

Like many other “data streaming approaches” for the web, SSEs establish a long-lived HTTP connection between the server and the client. Once the connection is established, the server can send data to the client anytime without requiring the client to make additional requests. This contrasts traditional HTTP connections, where the client must continuously poll the server for updates. SSEs provide servers with one of many approaches to real-time data pushing to clients.

## How does SSE application work?

The server-sent event protocol is based on the HTTP protocol, and it uses the "text/event-stream" content type to send a stream of events from the server to the client. The server sends a series of events, each consisting of a JSON-formatted message, to the client. The client can then process these events as they arrive and update the user interface accordingly.

To establish an SSE connection, the client sends an HTTP GET request to the server, requesting the SSE endpoint. The server responds with a "200 OK" HTTP status code and sets the "Content-Type" header to "text/event-stream." From then on, the server can send events to the client anytime.

The server sends the events as a continuous stream, separated by newlines. Each event is preceded by an "event" field, which specifies the type of the event. It can also include fields like "data" to provide additional information. The events are sent in the following format:

```
event: eventType
data: eventData
```

The client receives these events and processes them as they arrive. It can use JavaScript to listen for the "message" event on the SSE connection object and handle the received data accordingly. For example, the client can update the user interface with the new data or perform other necessary actions.

The SSE connection remains open until the client or the server closes it. The server can no longer send events if the client closes the connection. However, if the server closes the connection, the client must reconnect and continue receiving events.

## What are the advantages of using server-sent events?

- Server-sent events (SSEs) are a useful to streaming data unidirectionally (i.e., “one direction”) from server to client for streaming data like stock quotes, bitcoin prices, etc.

- Simplicity and ease of use: SSEs provide a straightforward way to establish a unidirectional connection between the server and the client. The client subscribes to an SSE endpoint, and the server can then push data to the client over this connection without needing the client to send requests constantly.

- Reduced network overhead: SSEs significantly reduce web overhead compared to constantly polling techniques (i.e., having each client request data from servers every few seconds). With SSEs, the server only sends data to the client when new information is available, minimizing unnecessary data transfers and reducing bandwidth usage.

- Standardized protocol: SSEs are based on the HTTP protocol, making them easily deployable and compatible with existing web infrastructure. SSEs use a single long-lived HTTP connection, eliminating the need for additional protocols or libraries.

- Automatic reconnection: SSEs automatically handle reconnection in case of network disruptions or server failures. The client will automatically try reconnecting to the server when the connection is lost without additional code implementation.

- Cross-domain support: SSEs support cross-domain communication, making them suitable for scenarios where the server and client are hosted on different domains. This allows for greater flexibility in designing and deploying applications.

- Accessibility and compatibility: SSEs are built on HTML5 technology and are supported by modern web browsers. This ensures broad compatibility and accessibility for application developers without additional plugins or software installations.

## Conclusion

SSEs are a valuable tool as they provide a standardized and efficient way to implement real-time updates for unidirectional use cases. They offer benefits such as instant updates, reduced network traffic and server load, simplified client-side implementation, and compatibility with existing web infrastructure. By leveraging SSEs, developers can enhance the user experience of their realtime apps and provide users with live and up-to-date information more efficiently and scalable.

With over 15 points of presence worldwide supporting 800 million monthly active users and 99.999% reliability, you’ll never have to worry about outages, concurrency limits, or any latency issues caused by traffic spikes. PubNub is perfect for any application that requires real-time data.
