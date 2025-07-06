import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { loginSchema, registerSchema } from "@/lib/validation";

const { height } = Dimensions.get("window");

export default function Auth() {
  const [isLogin, setIsLogin] = useState<"login" | "register">("login");

  return (
    <View>
      <ImageBackground
        source={{ uri: "https://rb.gy/0oz37g" }}
        resizeMode="cover"
        className="flex-1 relative"
        style={{ height: height }}
      >
        <View
          className="absolute inset-0 w-full h-full bg-['rgba(0,0,0,0.7)']"
          style={{ height }}
        />
        <SafeAreaView>
          <Image
            source={require("../assets/images/netflix.png")}
            resizeMode="contain"
            className="w-[100px] h-10"
          />

          <View className="justify-center items-center" style={{ height }}>
            <View
              className="w-[90%] bg-black rounded-[10px] p-5"
              style={{ minHeight: height / 3 }}
            >
              {isLogin === "login" && <Login setIsLogin={setIsLogin} />}
              {isLogin === "register" && <Register setIsLogin={setIsLogin} />}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

type Props = {
  setIsLogin: Dispatch<SetStateAction<"login" | "register">>;
};

function Login({ setIsLogin }: Props) {
  return (
    <View>
      <Text className="text-white text-3xl font-bold"> Sign In</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={loginSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="flex-col mt-5 gap-5">
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter your email"
              placeholderTextColor={"#999"}
              className="w-[95%] h-[50px] border-none p-[10px] rounded-[10px] bg-[#333] text-white"
            />
            {errors.email && touched.email && (
              <Text className="text-red-500  mt-1">{errors.email}</Text>
            )}
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              placeholderTextColor={"#999"}
              className="w-[95%] h-[50px] border-none p-[10px] rounded-[10px] bg-[#333] text-white"
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text className="text-red-500  mt-1">{errors.password}</Text>
            )}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="w-[96%] h-[50px] bg-[#E7442E] rounded-xl justify-center items-center border-none"
            >
              <Text className="text-white text-base font-bold">Login</Text>
            </TouchableOpacity>

            <View className="flex-row items-center gap-[10px]">
              <Text className="text-white">New to Netflix?</Text>
              <TouchableOpacity onPress={() => setIsLogin("register")}>
                <Text style={{ color: "lightblue", fontWeight: "bold" }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

function Register({ setIsLogin }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <View>
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={registerSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ flexDirection: "column" }}>
            {error && (
              <View style={styles.alert}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            )}
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "48%" }}>
                <TextInput
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder="First Name"
                  placeholderTextColor="gray"
                  style={styles.input}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {errors.firstName}
                  </Text>
                )}
              </View>
              <View style={{ width: "48%" }}>
                <TextInput
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Last Name"
                  placeholderTextColor="gray"
                  style={styles.input}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {errors.lastName}
                  </Text>
                )}
              </View>
            </View>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter your email"
              placeholderTextColor="gray"
              style={styles.input}
            />
            {errors.email && touched.email && (
              <Text style={{ color: "red", marginTop: 5 }}>{errors.email}</Text>
            )}
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {errors.password}
              </Text>
            )}
            {/* @ts-ignore */}
            <TouchableOpacity onPress={handleSubmit} style={styles.formButton}>
              <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity>

            <View style={styles.bottomContent}>
              <Text className="text-white">Already have an account?</Text>
              <TouchableOpacity onPress={() => setIsLogin("login")}>
                <Text style={{ color: "lightblue", fontWeight: "bold" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "96%",
    height: 50,
    borderWidth: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#333",
    color: "white",
    marginTop: 20,
  },
  formButton: {
    width: "96%",
    height: 50,
    backgroundColor: "#E7442E",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
  },
  textButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  alert: {
    backgroundColor: "rgba(255,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  alertText: {
    color: "rgb(255,0,0)",
    fontWeight: "bold",
  },
});
