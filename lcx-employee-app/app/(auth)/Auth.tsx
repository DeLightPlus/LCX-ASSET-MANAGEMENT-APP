import React, { useState, useCallback } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { AppState, Alert, Text, View, Image, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from 'expo-router';

// Automatically refresh the session if the app is in the foreground
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Generalized sign-in/signup handler
  const handleAuth = useCallback(
    async (action: 'signIn' | 'signUp') => {
      setLoading(true)

      let response;
      let errorMessage = '';

      if (action === 'signIn') 
      {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) errorMessage = error.message
      } 
      else if (action === 'signUp') 
      {
        const { data: { user, session }, error } = await supabase.auth.signUp({ email, password })
        
        if (error) 
        {
          errorMessage = error.message
        } 
        else if (user) 
        {
          // Insert user data into the 'users' table
          const { error: dbError } = await supabase.from('employees').insert([
            {
              userId: user.id,
              email: user.email,
              first_name: '',
              last_name: '',
              phone: '',
              role: 'employee', // Default role
              created_at: new Date().toISOString(),
            },
          ])

          if (dbError) {
            errorMessage = dbError.message
          } else if (!session) {
            errorMessage = 'Please check your inbox for email verification!'
          }
        }
      }

      if (errorMessage) {
        Alert.alert(errorMessage)
      }

      setLoading(false)
    },
    [email, password]
  )

  return (
    <SafeAreaView className="bg-[#f5f8dc] flex-1">
      <ScrollView>
        <View className="flex-1 px-6 py-8 bg-white rounded-3xl mx-4 my-4 relative min-h-[85vh]">
          <View className="items-center">
            <Image
              source={images.Logo}
              resizeMode="contain"
              className="w-[170px] h-[80px] mb-8"
            />
          </View>
          
          <Text className="text-2xl font-semibold text-headings mb-1">Welcome Back</Text>
          <Text className="text-base font-semibold text-texts mb-8">Sign in to continue</Text>

          <FormField
            title="Email"
            value={email}
            handleChangeText={setEmail}
            otherStyles="mb-5"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          
          <FormField
            title="Password"
            value={password}
            handleChangeText={setPassword}
            otherStyles="mb-2"
            placeholder="Enter your password"
            isPassword={true}
          />
          
          <Text 
            className="text-right text-primary font-semibold mb-6"
            onPress={() => router.push("/forgot-password")}
          >
            Forgot Password
          </Text>

          <CustomButton
            title="Continue"
            handlePress={() => handleAuth('signIn')}
            containerStyles="mb-6"
            isLoading={loading}
          />

          {/* <View className="flex-row justify-center mb-10">
            <Text className="text-texts font-semibold">Don't have an account? </Text>
            <Link href="/signup" asChild>
              <Text className="font-semibold text-primary">Sign Up</Text>
            </Link>
          </View> */}

          <CustomButton
            title="Signup"
            handlePress={() => handleAuth('signUp')}
            containerStyles="mb-6"            
            isLoading={loading}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}

const InputField = ({ label, icon, value, onChange, secureTextEntry = false }) => (
  <View style={styles.verticallySpaced}>
    <Input
      label={label}
      leftIcon={{ type: 'font-awesome', name: icon }}
      onChangeText={onChange}
      value={value}
      placeholder={`${label}@address.com`}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
    />
  </View>
)

export default Auth
