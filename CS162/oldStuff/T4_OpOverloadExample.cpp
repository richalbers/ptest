//--------------------------------------------------------------------------------------
//
// Example file showing:
//   friend functions (friends are used in one form of operator overloading)
//   operator overloading
//
// note: friend functions are not members of the class but have access to public members
//
//---------------------------------------------------------------------------------------
// interface (.h)

class cDog {
private:
	int weight;
public:
	cDog(int weight);

	// generic friend function example
	friend void feedTheDog(cDog theDogToFeed);

	//binary operator overloading examples (using two different methods)
	friend CDog operator+(const cDog& dog1, const cDog&, dog2);
	CDog operator-(const cDog&, dog2);

	//ostream example (must be friend, not a member)
	friend ostream& operator <<(ostream& os, const cDog& dog);
}

//-------------------------------------------------------------------------------
// implementation (.cpp)

//constructor
cDog::cDog(int weight) 
{
	this->weight = weight;
}

//friend function implementation
void feedTheDog(cDog theDogToFeed) {
	theDogToFeed.weight++;	//accesses private data even though we're not a class member (we're a friend!)
}

//binary operators (==, <, +, -, etc..) can be friends or members
//as friend....
CDog operator+(const cDog& dog1, const cDog&, dog2)
{
	cDog newDog;
	newDog.weight = dog1.weight + dog2.weight;
	return newDog;
}

//as member
CDog CDog::operator-(const cDog&, dog2)
{
	cDog newDog;
	newDog.weight = weight - dog2.weight;
	return newDog;
}

//output stream
friend ostream& operator<<(ostream& os, const cDog& dog) {
	os << weight;	
	return os;
}

//-------------------------------------------------------------------------------------
// class test/demo code

main() {
	cDog dog1(20);
	cDog dog2(30);

	cDog dog3 = dog1 + dog2; //fuse two dogs together, makes a bigger dog!

	cDog dog4 = dog2 - dog1; //subtract dogs, makes a smaller dog!

	cout << dog1 << " " << dog2 << " " << dog3 << " " << dog4 << endl;
}