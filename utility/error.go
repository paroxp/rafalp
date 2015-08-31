package utility

import "errors"

// Error struct will handle errors in our way.
type Error struct {
	Bag     map[string]string `json:"error"`
	Message string            `json:"message"`
}

// Add will put new error into our message bag.
func (e Error) Add(key string, message string) Error {
	if e.Empty() {
		e.Bag = make(map[string]string)
	}

	e.Bag[key] = message

	return e
}

// Count the amount of errors in the bag.
func (e Error) Count() int {
	return len(e.Bag)
}

// Empty will simply return boolean determining if the bag is empty.
func (e Error) Empty() bool {
	return e.Count() == 0
}

// First will pull out the first error met.
func (e Error) First() error {
	for _, err := range e.Bag {
		return errors.New(err)
	}

	return nil
}

// Get will find the error by id.
func (e Error) Get(key string) error {
	if err, ok := e.Bag[key]; ok {
		return errors.New(err)
	}

	return nil
}

// New error bag set up.
func (e Error) New() Error {
	e.Bag = make(map[string]string)

	return e
}

// SetMessage will add main piece of content to the struct.
func (e Error) SetMessage(message string) Error {
	e.Message = message

	return e
}
