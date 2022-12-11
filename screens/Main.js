import React,{Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {StatusBar} from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission:null,
            faces:[]
        };
        this.onFacesDetected= this.onFacesDetected.bind(this);
    }

    async componentDidMount(){
        const {status}= await Camera.requestPermissionsAsync();
        this.setState({hasCameraPermission: status === 'granted'});
    }

    onFacesDetected({faces}){
        this.setState({faces: faces})
    }

    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render(){
        var { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            );
        }
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.upperContainer}>
                    <Image 
                        source={require('../assets/logo.png')}
                        style={styles.appIcon}
                    />
                    <Text style={styles.appName}>Look Me App</Text>
                </View>
                <View style={styles.middleContainer}>
                    <Camera 
                        style={{flex:1}}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast, 
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectedError={this.onFacesDetectionError}
                    />
                </View>
                <View style={styles.lowerContainer}>
                    <View style={styles.lowerTopContainer}></View>
                    <View style={styles.lowerBottomContainer}></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CCCCFF'
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    upperContainer: {
      flex: 0.13,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#CCCCFF",
      flexDirection: "row"
    },
    appIcon: {
      width: 50,
      height: 50,
      borderRadius: 25
    },
    appName: {
      fontSize: 25,
      color: 'white'
    },
    middleContainer: { flex: 0.67 },
    lowerContainer: {
      flex: 0.2,
      backgroundColor: "#CCCCFF"
    },
    lowerTopContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    lowerBottomContainer: {
      flex: 0.7,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#DE3163"
    }
});