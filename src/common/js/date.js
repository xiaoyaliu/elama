/**
 * Created by liuxiaoya；
 *date 2017/8/12 0012.
 *description
 */
export function formatDate(date,fmt){
  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  var date = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return fmt;
}
