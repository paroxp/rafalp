package model

// Model will be base the start off for any other model.
type Model interface {
	Create() struct{}
	Delete() struct{}
	Find() struct{}
	Get() struct{}
}
