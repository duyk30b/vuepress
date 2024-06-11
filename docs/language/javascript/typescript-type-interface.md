# Type & Interface
## Exclude
```typescript
type NumberOrString = number | string
type RemoveString = Exclude<NumberOrString, string> // tương đương:  = number
const demo1: RemoveString = 100 // ==> đúng
const demo2: RemoveString = 'a' // ==> lỗi, vì đã loại bỏ type string
```

## Sử dụng keyof và typeof
```typescript
type Student = {
	name: string;
	age: number;
}
type KeyOfStudent = keyof Student // tương đương: = "name" | "age"

enum ESort {
	ASC = 'asc',
	DESC = 'desc'
}
type KeyOfESort = keyof ESort // tương đương: = "toString" | "slice" | "indexOf" | "charAt" | "charCodeAt" | ...
type KeyOfTypeOfESort = keyof typeof ESort // tương đương: = "ASC" | "DESC"

const xx: typeof ESort = {
	// ASC: 'asc',  // lỗi
	// ASC: ESort.DESC,  // lỗi
	ASC: ESort.ASC,
	DESC: ESort.DESC,
}

enum EGender {
	ASC = 'asc',
	DESC = 1
}
type KeyOfEGender = keyof EGender // tương đương: = "toString" | "valueOf"
type KeyOfTypeOfEGender = keyof typeof EGender // tương đương: = "ASC" | "DESC"

const yy: typeof EGender = {
	// ASC: 'xyz',  // lỗi
	// ASC: 'asc',  // lỗi
	// ASC: ESort.DESC,  // lỗi
	// DESC: 1, // ok
	// DESC: 2, // lỗi
	ASC: EGender.ASC, // ok
	DESC: EGender.DESC, // ok
}

type KeyOfAny = keyof any // tương đương: = string | number | symbol
const keyOfAny1: KeyOfAny = 'xx' // ok
const keyOfAny2: KeyOfAny = 12 // ok
const keyOfAny3: KeyOfAny = [] // lỗi
```

## Sử dụng [P in keyof XXX]
```typescript
type Student = {
	name: string;
	age: number;
}
type StudentExtend = {
	[P in keyof Student]: string;
}
// tương đương với
// type StudentExtend = {
//     name: string;
//     age: string;
// }

enum ESort {
	ASC = 'asc',
	DESC = 'desc',
}
type ESortExtend = {
	[P in keyof typeof ESort]: string;
}
// tương đương với
// type ESortExtend = {
//     readonly ASC: string;
//     readonly DESC: string;
// }
type ESortExtendError = {
	[P in keyof ESort]: string;
}
// tương đương với
// type ESortExtendError = {
//     [x: number]: string;
//     toString: string;
//     charAt: string;
//     charCodeAt: string;
//     ...more...;
//     at: string;
// }
```


```typescript
// keyof và typeof
## Sử dụng [P in keyof Student]
type Student = {
	name: string;
	age: number;
}
type InStudent = {
	[P in keyof Student]: string;
}
type ForbidStudent = {
	[P in keyof Student]: never;
}
const demoInStudent: InStudent = {
	name: 'Hoàng', // ok
	age: 'xxx', // ok
	// age: 12, // lỗi
}
const demoForbid: ForbidStudent = {
	name: 'Hoàng', // lỗi name phải là type never
	address: 'xxx', // lỗi address không tồn tại trong type
}

## Trường hợp tiếp theo
enum ESort {
	ASC = 'asc',
	DESC = 'desc'
}
enum EGender {
	MALE = 'male',
	FEMALE = 0
}
type ESortType = {
	mark: typeof ESort; // tương đương: = 'object'
}
type ESortKeyof = {
	mark: keyof ESort; // tương đương: nhận giá trị là tất cả key trong string
	hair: keyof EGender; // tương đương: nhận giá trị là tất cả key trong string
}
type ESortKeyType = {
	mark: keyof typeof ESort; // tương đương: = 'ASC' | 'DESC'
}

const eSortType1: ESortType = { mark: 'xx' } // lỗi, vì mark phải là object
const eSortType2: ESortType = { mark: { abc: 'xx' } } // lỗi, mark là object, nhưng phải là type ESort
const eSortType3: ESortType = { mark: { ASC: 'xx' } } // lỗi, xx phải là value của ESort
const eSortType: ESortType = { mark: { ASC: ESort.ASC, DESC: ESort.DESC } }

const eSortKey1: ESortKeyof = {
	// mark: 'xyz' // lỗi
	// mark: 4, // ok
	mark: 'substring', // nhận tất cả các giá trị là property của string
	hair: 'toString', // chỉ còn nhận 'toString' và 'valueOf'
}

const eSortKeyType1: ESortKeyType = { mark: 'ASC' } // ok
const eSortKeyType2: ESortKeyType = { mark: 'EQ' } // lỗi

```