import { EventEmitter } from 'events';

export default class NotifyManager extends EventEmitter {
  constructor() {
    super();
    this.notify = [];
    this.timeOut = 6000;
  }

  create(params) {
    const defaul = {
      id: Math.floor(Date.now() / (Math.random() * 1000000)),
      type: 'info'
    };
    this.notify.push(Object.assign(defaul, params));
    this.emitChange();
  }

  info({ title = null, message = null, timeOut = this.timeOut }) {
    this.create({
      title,
      message,
      timeOut,
      type: 'info'
    });
  }

  success({ title = null, message = null, timeOut = this.timeOut }) {
    this.create({
      title,
      message,
      timeOut,
      type: 'success'
    });
  }

  danger({ title = null, message = null, timeOut = this.timeOut }) {
    this.create({
      title,
      message,
      timeOut,
      type: 'danger'
    });
  }

  warning({ title = null, message = null, timeOut = this.timeOut }) {
    this.create({
      title,
      message,
      timeOut,
      type: 'warning'
    });
  }

  custom({ title = null, message = null, timeOut = this.timeOut }) {
    this.create({
      title,
      message,
      timeOut,
      type: 'custom'
    });
  }

  remove(id) {
    this.notify = this.notify.filter(n => id !== n.id);
    this.emitChange();
  }

  emitChange() {
    this.emit('change', this.notify);
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.off('change', callback);
  }
}
