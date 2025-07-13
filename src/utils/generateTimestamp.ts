const TIMESTAMP_TEMPLATE = 'YYYY-MM-DD_HH:mm:ss'

function replace(str: string, searchValue: string, replaceValue: number) {
  const stringifiedReplaceValue = replaceValue.toString()
    .slice(0, searchValue.length)
    .padStart(searchValue.length, '0')

  return str.replace(searchValue, stringifiedReplaceValue)
}

export function generateTimestamp(date: Date) {
  let timestamp = TIMESTAMP_TEMPLATE

  timestamp = replace(timestamp, 'YYYY', date.getFullYear())
  timestamp = replace(timestamp, 'MM', date.getMonth() + 1)
  timestamp = replace(timestamp, 'DD', date.getDate())

  timestamp = replace(timestamp, 'HH', date.getHours())
  timestamp = replace(timestamp, 'mm', date.getMinutes())
  timestamp = replace(timestamp, 'ss', date.getSeconds())

  return timestamp
}
