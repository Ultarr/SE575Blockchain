cd ./src/java/BlockChain/
./gradlew build
wait
cd ./build/libs/
java -jar ./blockchain-1.0.0.jar &
BLOCKCHAIN_BACKEND_JAVA_SERVER=$!
cd ../../../../app/BlockChain/
ng serve --open
kill -9 $BLOCKCHAIN_BACKEND_JAVA_SERVER