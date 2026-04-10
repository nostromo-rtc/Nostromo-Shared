
export type HttpMethod = "GET" | "OPTIONS" | "POST" | "PATCH" | "HEAD";

export const FileServiceConstants =
{
    TUS_VERSION: "1.0.0",
    FILES_ROUTE: "/files"
} as const;

interface Dict<T>
{
    [key: string]: T | undefined;
}

// for request and response
interface HttpHeaders extends Dict<string>
{
    /**
     * The Upload-Offset request and response header indicates a byte offset within a resource. The value MUST be a non-negative integer.
     */
    "Upload-Offset"?: string;

    /**
     * The Upload-Length request and response header indicates the size of the entire upload in bytes. The value MUST be a non-negative integer.
     */
    "Upload-Length"?: string;

    /**
     * The Tus-Resumable header MUST be included in every request and response except for OPTIONS requests. The value MUST be the version of the protocol used by the Client or the Server.
     * If the version specified by the Client is not supported by the Server, it MUST respond with the 412 Precondition Failed status and MUST include the Tus-Version header into the response. In addition, the Server MUST NOT process the request.
     */
    "Tus-Resumable"?: string;

    /**
     * Directives for caching mechanisms in both requests and responses.
     */
    "Cache-Control"?: string;

    /**
     * This request and response header MUST consist of one or more comma-separated key-value pairs.
     * The key and value MUST be separated by a space.
     * The key MUST NOT contain spaces and commas and MUST NOT be empty.
     * The key SHOULD be ASCII encoded and the value MUST be Base64 encoded.
     * All keys MUST be unique.
     * The value MAY be empty.
     * In these cases, the space, which would normally separate the key and the value, MAY be left out.
     */
    "Upload-Metadata"?: string;
};

/** For request. */
export interface IncomingHttpHeaders extends HttpHeaders
{
    /**
     * The X-HTTP-Method-Override request header MUST be a string which MUST be interpreted as the request’s method by the Server, if the header is presented. The actual method of the request MUST be ignored. The Client SHOULD use this header if its environment does not support the PATCH or DELETE methods.
     */
    "X-HTTP-Method-Override"?: HttpMethod;
    /**
     * The Content-Type representation header is used to indicate the original media type of the resource (prior to any content encoding applied for sending).
     */
    "Content-Type"?: string;
    /**
     * Non TUS header. This header determines which room has file.
     */
    "Room-Id"?: string;
};

/** For response. */
export interface OutgoingHttpHeaders extends HttpHeaders
{
    /**
     * The Tus-Version response header MUST be a comma-separated list of protocol versions supported by the Server. The list MUST be sorted by Server’s preference where the first one is the most preferred one.
     */
    "Tus-Version"?: string;

    /**
     * The Tus-Extension response header MUST be a comma-separated list of the extensions supported by the Server. If no extensions are supported, the Tus-Extension header MUST be omitted.
     */
    "Tus-Extension"?: string;

    /**
     * The Tus-Max-Size response header MUST be a non-negative integer indicating the maximum allowed size of an entire upload in bytes. The Server SHOULD set this header if there is a known hard limit.
     */
    "Tus-Max-Size"?: string;
};

export interface FileServiceRequest
{
    method: HttpMethod;
    path: string;
    headers?: IncomingHttpHeaders;
};

export interface FileServiceResponse
{
    headers?: OutgoingHttpHeaders;
    statusCode: number;
};