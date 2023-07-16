/**
 * 使用 Linked List 實作 Stack
 * 實作需包含以下方法。
 * push() : 添加新元素。/pop():移除元素並返回被移除的元素。/size():返回所有元素數量。
 * const myStack = new Stack()
 * myStack.push(1)
 * myStack.push(2)
 * myStack.push(3)
 * myStack.pop() // 3
 * myStack.size() // 2
 */

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor() {
        this.head = null
        this.length = 0
    }

    push(value) {
        const newNode = new Node(value)
        if (this.head === null) {
            this.head = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
    }

    pop() {
        if (this.head === null) {
            return null
        }
        const poppedNode = this.head
        this.head = this.head.next
        this.length--
        return poppedNode.value
    }

    size() {
        return this.length
    }
}

const myStack = new Stack()
myStack.push(1)
myStack.push(2)
myStack.push(3)
console.log(myStack.pop())
console.log(myStack.size())

/**
 * 請根據字母順序 A, B, C ..., Z 找出 Array 中最順序前面的字母
 * @input  [G, H, E, Z, Y]
 * @output E
 */
const sortAlphabet = () => {
    const input = ['G', 'H', 'E', 'Z', 'Y']
    const output = input.sort()[0]
    console.log('找出 Array 中最順序前面的字母:', output)
}

sortAlphabet()

/**
 * 將 Object key 攤平成 String
 * @input  {a: { b: 5, c: {d: 3} }, e: { f: ‘foo’ } }
 * @output { ‘a.b’: 5 , ‘a.c.d’: 3, ‘e.f’: ‘foo’ }
 */

const transToString = () => {

    const addPrefixKey = (obj, prefix = '') => {
        return Object.keys(obj).reduce((accData, key) => {
            const value = obj[key]
            const accKey = prefix ? `${prefix}.${key}` : key
            if (typeof value === 'object') {
                Object.assign(accData, addPrefixKey(value, accKey))
            } else {
                accData[accKey] = value
            }
            return accData
        }, {})
    }

    const input = { a: { b: 5, c: { d: 3 } }, e: { f: 'foo' } }
    const output = addPrefixKey(input)
    console.log('將 Object key 攤平成 String:', output)
}

transToString()

/**
 * 請根據輸入的數字區間找出數字 1 到 20 間重疊與未包含的數字區間
 * @input  [[6, 11], [5, 8], [17, 20], [7], [14,17]]
 * @output { overlap: [[6, 8], [17]], notInclude: [[1, 4], [12, 13]] }
 */
const findIntervals = () => {
    const overlapAndNotIncludeInterval = (input) => {
        const sortedData = input
            .filter(interval => interval.length === 2)
            .sort((a, b) => a[0] - b[0])

        const overlap = []
        const notInclude = []
        let start = 1

        sortedData.forEach(([currentStart, currentEnd], i) => {
            const nextStart = sortedData[i + 1]?.[0]
            const nextEnd = sortedData[i + 1]?.[1]

            if (currentEnd >= nextStart) {
                const overlapStart = Math.max(currentStart, nextStart)
                const overlapEnd = Math.min(currentEnd, nextEnd)
                overlap.push([overlapStart, overlapEnd])
            }

            if (start < currentStart) {
                notInclude.push([start, currentStart - 1])
            }
            start = currentEnd + 1
        })

        return { overlap, notInclude }
    }

    const input = [[6, 11], [5, 8], [17, 20], [7], [14, 17]]
    const output = overlapAndNotIncludeInterval(input)
    console.log('尋找重疊與未包含的數字區間', output)
}

findIntervals()

/**
 * 請使用正規表達式實作數字加上千分位
 * @input  -7855948.9527
 * @output -7,855,948.9527
 */

const addThousandths = () => {
    const input = -7855948.9527
    const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    const output = input.toString().replace(comma, ',')
    console.log('正規表達式實作數字加上千分位:', output)
}
addThousandths()

/**
 * 擇一實作 Debounce
 * debounce 是在 delay 時間內如果重新觸發會取消前一次並保留當下觸發的執行。
 * 建立函式 debounce 或 throttle 帶入參數如下範例:
 * const debounceFunc = debounce(func, delay)
 */

const debounce = (func, delay) => {
    let timeoutID

    return () => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            func()
        }, delay)
    }
}

const handleInput = () => {
    console.log('輸入事件已觸發！')
}

const debounceFunc = debounce(handleInput, 2000)

debounceFunc()
console.log('✍️ 輸入值...')
debounceFunc()
console.log('✍️ 輸入值...')
debounceFunc()
console.log('✍️ 輸入值...')

/**
 * 使用 Event Loop 結合實際操作範例敘述 Debounce 的運作方式
 * 如文字輸入、scroll 操作與 button 連續點擊,或是其他可結合 Debounce 或 Throttle
 * 的行為都可以拿來當作操作範例。
 */

/**
 * 
 * 當用戶在輸入文字，進行實時搜索時，每打一個字就會呼叫一次 api，
 * 但用戶頻繁輸入就可能會影響到效能，因此需要使用 Debounce 來防止頻繁呼叫 api
 * 
 * 假設用戶今日要搜尋 "sunny"，搜尋結果為與輸入值相同的前綴結果，Debounce 延遲時間為 2 秒
 * 
 * 用戶於第 0 秒輸入 "s"，根據 Event Loop 會先將 '搜尋值加入 s' 放入 Queue 裡面不執行，等待 2 秒後再執行
 * 接下來用戶又在第 1 秒時輸入 "s"，這時 clearTimeout 會清除 Queue 中 '搜尋值加入 s'，並將 '搜尋值加入 su' 放入 Queue 裡面不執行，等待2 秒後再執行
 * 2 秒後執行 '搜尋值加入 su'，呼叫 api 搜尋 su ，用戶可以看到前綴為 su 的搜尋結果
 * 接下來用戶又在第 4 秒時輸入 "n"，'搜尋值加入 n' 放入 Queue 裡面不執行，等待 2 秒後再執行
 * 接下來用戶又在第 5 秒時輸入 "n"，這時 clearTimeout 會清除 Queue 中 '搜尋值加入 n'，並將 '搜尋值加入 nn' 放入 Queue 裡面不執行，等待 2 秒後再執行
 * 接下來用戶又在第 6 秒時輸入 "y"，這時 clearTimeout 會清除 Queue 中 '搜尋值加入 nn'，並將 '搜尋值加入 nny' 放入 Queue 裡面不執行，等待 2 秒後再執行
 * 2 秒後執行 '搜尋值加入 nny'，呼叫 api 搜尋 sunny ，用戶可以看到前綴為 sunny 的搜尋結果
 */


