
export default class ThreadStream {
  constructor() {
    throw new Error('thread-stream is not supported in browser');
  }
  write() {}
  end() {}
  cork() {}
  uncork() {}
}