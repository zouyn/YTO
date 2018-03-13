export const YtoTimeOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now();
  },
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      picker.$emit('pick', new Date());
    }
  }, {
    text: '昨天',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', date);
    }
  }, {
    text: '一周前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    }
  }]
};

export const FormatDate = (nowDate, num = 0) => {
  let newDate = new Date(nowDate);
  newDate.setDate(newDate.getDate() + num);
  let o = {
    'Y': 1900 + newDate.getYear(),
    'M': '0' + (newDate.getMonth() + 1),
    'D': '0' + newDate.getDate(),
    'HH': newDate.getHours(),
    'mm': newDate.getMinutes()
  };
  let nowTime = o.Y + '-' + o.M.substring(o.M.length - 2, o.M.length) + '-' + o.D.substring(o.D.length - 2, o.D.length);
  return nowTime;
};

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

export const iframeAutoH = () => {
  setTimeout(function () {
    // console.log(document.body.clientHeight + ' clientHeight');
    if (window.parent !== window.self) {
      let a = parent.document.getElementsByTagName('IFRAME');
      for (let i = 0; i < a.length; i++) {
        // console.log(a[i].contentWindow.document.body.scrollHeight + ' scrollHeight');
        if (a[i].contentWindow === window) {
          a[i].style.height = 'auto';
          if (document.body.scrollHeight < 480) {
            a[i].style.height = '480px';
          } else {
            a[i].style.height = document.body.scrollHeight + 'px';
          }
        }
      }
    }
  }, 100);
};
