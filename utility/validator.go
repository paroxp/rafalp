package utility

import (
	"regexp"
	"unicode/utf8"
)

// Validator instance will check many different values.
type Validator struct {
	Error
}

const (
	empty     string = "Value needs to be empty."
	isEmail   string = "Value needs to be valid email address."
	notEmpty  string = "Value should not be empty."
	maxLength string = "Value needs to be maximum %s characters long."
	minLength string = "Value needs to be at least %s characters long."
)

// ValidationResponse stricts the validation functions to return two values.
type ValidationResponse func() (bool, string)

// Empty will return oposite result of NotEmpty.
func (v Validator) Empty(value string, message string) ValidationResponse {
	return func() (bool, string) {
		vr := v.NotEmpty(value, message)
		result, _ := vr()

		return !result, message
	}
}

// IsEmail will validate the string for the correct email.
func (v Validator) IsEmail(value string, message string) ValidationResponse {
	return func() (bool, string) {
		email := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)

		return email.MatchString(value), message
	}
}

// NotEmpty will determine if the string isn't blank.
func (v Validator) NotEmpty(value string, message string) ValidationResponse {
	return func() (bool, string) {
		return value != "", message
	}
}

// MaxLength will validate if string given is maximum x characters long.
func (v Validator) MaxLength(value string, length int, message string) ValidationResponse {
	return func() (bool, string) {
		return utf8.RuneCountInString(value) >= length, message
	}
}

// MinLength will validate if string given is minimum x characters long.
func (v Validator) MinLength(value string, length int, message string) ValidationResponse {
	return func() (bool, string) {
		return utf8.RuneCountInString(value) <= length, message
	}
}

// Validate field agains many rules.
func (v Validator) Validate(name string, validate ...ValidationResponse) Validator {
	errors := v.Error

	for _, response := range validate {
		result, message := response()

		if !result {
			errors = errors.Add(name, message)
		}
	}

	v.Error = errors

	return v
}
