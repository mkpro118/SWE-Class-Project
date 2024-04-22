Last Updated: 4/17/24

## Create Test
Create a test file in the 'test' directory that has an identical relative path 
as in the atual java project. All test files must have 'Test' appended to the end
of their name in order to run. 

## Testing Repositories

All query methods should test the following:
1. Format and Spelling of Query String
2. Schema Response fields

All handle methods should test the following:
1. Get All Details is executed appropriately
2. Get All Basic Details is executed appropriately
3. Get By Id is executed appropriately
4. The handle method closes the connection before returning

Summary: There should be 2 tests per query method and 4 tests per handle method

## Run Test

Use `./gradlew test` to run a test.