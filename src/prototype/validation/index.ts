const SHOULD_NOT_BE_EMPTY = "Should not be empty!";

export type Validator<T> = (value: T[keyof T]) => string;
export type ErrorState<T extends object> = Record<Partial<keyof T>, Array<string>>


export type ValidatorConfig<T> = Record<Partial<keyof T>, Array<Validator<T>>>

export function validateStateFunc<T extends object>(state: T, validatorConfig: ValidatorConfig<T>): ErrorState<T> {
  return Object.keys(state).reduce((acc, key) => {
    const typedKey = key as keyof T;

    if (!validatorConfig[typedKey]) {
      return acc
    }
    const validators = validatorConfig[typedKey];
    const errors = validators.map(func => func(state[typedKey])).filter(Boolean);

    if (errors) {
      acc[typedKey] = errors
    }
    return acc;

  }, {} as ErrorState<T>)
}


export function isNotEmptyValidator<T extends object>(value: T[keyof T]) {
  if (!value) {
    return SHOULD_NOT_BE_EMPTY
  }
  return '';
}

export function isNotLessThanValidator<T extends object>(optimalLength: number) {
  return (value: T[keyof T]) => {
    if ((value?.toString()?.length || 0) < optimalLength) {
      return `Should have at least ${optimalLength} symbols`
    }
    return ''
  }
}

export function isNotBiggerThanValidator<T extends object>(optimalLength: number) {
  return (value: T[keyof T]) => {
    if ((value?.toString()?.length || 0) > optimalLength) {
      return `Should have maximum ${optimalLength} symbols`
    }
    return ''
  }
}

export function firstCharIsCapitalLetterValidator<T extends object>() {
  return (value: T[keyof T]) => {
    const firstLetter = value?.toString().charAt(0)
    const firstLetterToLowerCase = value?.toString()?.charAt(0).toLowerCase()
    if (firstLetter === firstLetterToLowerCase) {
      return `First character should start with Capital Letter`
    }
    return ''
  }
}

export function onlyLettersValidator<T extends object>(title: string) {
  return (value: T[keyof T]) => {
    if ((/\d/).test(value?.toString() || "")) {
      return `${title} must contain only Letters`
    }
    return ''
  }
}

export function birthDateValidator<T extends object>(value: T[keyof T]) {
  const regex = /^(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01]).(\d{4})$/
  if (!regex.test(value?.toString() || "")) {
    return `Invalid Date. The format should be like this: 'DD.MM.YYYY'`
  }
  return ''
}

export function onlyAbbreviationValidator<T extends object>(value: T[keyof T]) {
  if ((/[a-z]/).test(value?.toString() || "")) {
    return `Should be only Abbreviation`
  }
  return ''
}

