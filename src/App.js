import React, { useState, useEffect } from "react";
import api from './services/api'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
    const [repositorios, setRepositorios] = useState([]);

    useEffect(() => {
        api.get('repositories')
        .then((res) => {
            setRepositorios(res.data);
            console.log(repositorios);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    async function handleLikeRepository(id) {
        api.post(`repositories/${id}/like`)
        .then(() => {
            const repoAux = repositorios.map(repo => {
                if(repo.id === id){
                    repo.likes++;
                }
                return repo;
                console.log(repo);
            })
            setRepositorios([...repoAux]);
        })
        .catch(err => console.error(err))
    }

  

    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <SafeAreaView style={styles.container}>
            <FlatList
                data={repositorios}
                keyExtractor={(repositorio) => repositorio.id}
                renderItem={({item: repositorio}) => (
                    <View style={styles.repositoryContainer}>
                        <Text style={styles.repository}>{repositorio.title}</Text>
                        <View style={styles.techsContainer}>
                            {repositorio.techs.map((tech, index) => (
                                <Text style={styles.tech} key={index}>
                                    {tech}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.likesContainer}>
                            <Text
                            style={styles.likeText}
                            // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                            testID={`repository-likes-${repositorio.id}`}
                            >
                            {`${repositorio.likes} curtidas`} 
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleLikeRepository(repositorio.id)}
                            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                            testID={`like-button-${repositorio.id}`}
                        >
                            <Text style={styles.buttonText}>Curtir</Text>
                        </TouchableOpacity>
                    </View>
                    
                )}
            />
            {/* <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>Repository 1</Text>

            <View style={styles.techsContainer}>
                <Text style={styles.tech}>
                ReactJS
                </Text>
                <Text style={styles.tech}>
                Node.js
                </Text>
            </View>

            <View style={styles.likesContainer}>
                <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-1`}
                >
                3 curtidas
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(1)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-1`}
            >
                <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
            </View> */}
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7159c1",
    },
    repositoryContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        padding: 20,
    },
    repository: {
        fontSize: 32,
        fontWeight: "bold",
    },
    techsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    tech: {
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 10,
        backgroundColor: "#04d361",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#fff",
    },
    likesContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
        color: "#fff",
        backgroundColor: "#7159c1",
        padding: 15,
    },
});
