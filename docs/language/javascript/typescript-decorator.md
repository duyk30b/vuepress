# Decorator

```typescript
import "reflect-metadata";
const formatMetadataKey = Symbol("format");
const requiredMetadataKey = Symbol("required");

// Class Decorator
const Entity =
  (options: { stdName?: string; tblName?: string }) =>
  (target: Function & typeof BaseEntities) => {
    target.prototype.studentName = options.stdName;
    target.tableName = options.tblName;
  };

// Property Decorator
const CreatedAt =
  (options: { format?: string }) => (target: Object, propertyName: string) => {
    let time = new Date();
    const getter = () => {
      let value: string | number;
      if (options.format === "getTime") {
        value = time.getTime();
      }
      if (options.format === "toLocaleString") {
        value = time.toLocaleString();
      }
      return value;
    };
    const setter = (value: string | number) => {
      console.log("Start edit to:", value);
      time = new Date(value);
    };
    Object.defineProperty(target, propertyName, { get: getter, set: setter });
  };

// Method Decorator
const PrintJSON =
  (options: { indent: number }) =>
  (
    target: Object,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const originMethod = propertyDescriptor.value;
    propertyDescriptor.value = function (...args: any[]) {
      // const result = originMethod.apply(this, args)
      const result = originMethod.call(this, ...args);
      result.create_at = this.create_at;
      return JSON.stringify(result, null, options.indent);
    };
    return propertyDescriptor;
  };

// Params Decorator
const ConvertTime =
  (options: { format: string }) =>
  (target: Object, propertyKey: string, parameterIndex: number) => {
    let existingRequiredParameters: number[] =
      Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(
      requiredMetadataKey,
      existingRequiredParameters,
      target,
      propertyKey
    );
    console.log({
      target,
      propertyKey,
      parameterIndex,
      options,
      requiredMetadataKey,
      existingRequiredParameters,
    });
    // Loằng ngoằng, cái Reflect này chưa hiểu
  };

class BaseEntities {
  static tableName: string;
  studentName: string;
}

@Entity({ stdName: "Ngô Nhật Dương", tblName: "table_student" })
class StudentEntities extends BaseEntities {
  @CreatedAt({ format: "getTime" })
  create_at: string | number;

  @PrintJSON({ indent: 4 })
  printData(@ConvertTime({ format: "getTime" }) printDate: string) {
    return { studentName: this.studentName, printDate };
  }
}

const student1 = new StudentEntities();
console.log(
  "Entity infomation:",
  student1.studentName,
  StudentEntities.tableName
);
console.log("Student infomation: create_at =", student1.create_at);
student1.create_at = "11/12/2005, 10:31:23 PM";
console.log("Student after edit: create_at =", student1.create_at);
console.log("Student printData:", student1.printData(new Date().toString()));
```
