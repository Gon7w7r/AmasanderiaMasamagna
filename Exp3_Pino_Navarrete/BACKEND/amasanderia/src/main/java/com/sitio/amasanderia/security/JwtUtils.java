package com.sitio.amasanderia.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sitio.amasanderia.webconfig.JwtProperties;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private final JwtProperties jwtProperties;

    public JwtUtils(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    // MÉTODO PARA GENERAR TOKEN JWT
    public String generateToken(String email, String rut) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + getExpiration());

        return JWT.create()
                .withSubject(email) // Usamos el email como subject
                .withClaim("rut", rut) // Guardamos el RUT como claim
                .withClaim("email", email) // Guardamos el email como claim también
                .withIssuedAt(now) // Fecha de emisión
                .withExpiresAt(expiryDate) // Fecha de expiración
                .sign(Algorithm.HMAC256(getSecret())); // Firma con la clave secreta
    }

    // MÉTODO PARA VALIDAR TOKEN JWT
    public boolean validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(getSecret()))
                    .build();
            verifier.verify(token);
            return true;
        } catch (JWTVerificationException exception) {
            return false;
        }
    }

    // MÉTODO PARA EXTRAER EMAIL DEL TOKEN
    public String getEmailFromToken(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            return decodedJWT.getSubject(); // El subject es el email
        } catch (Exception e) {
            return null;
        }
    }

    // MÉTODO PARA EXTRAER RUT DEL TOKEN
    public String getRutFromToken(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            return decodedJWT.getClaim("rut").asString();
        } catch (Exception e) {
            return null;
        }
    }


    public String getSecret() {
        return jwtProperties.getSecret();
    }

    public long getExpiration() {
        return jwtProperties.getExpiration();
    }

    public String getPrefix() {
        return jwtProperties.getPrefix();
    }

    public String getHeader() {
        return jwtProperties.getHeader();
    }
}