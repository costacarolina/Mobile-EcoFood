import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/../context/themeContext";

export default function Scanner() {
  const { darkMode } = useTheme();

  const [permission, requestPermission] = useCameraPermissions();
  const [scaneado, setScaneado] = useState(false);
  const [lanterna, setLanterna] = useState(false);
  const [codigo, setCodigo] = useState("");

  const colors = darkMode
    ? {
        background: "#181818",
        card: "#2B2B2B",
        text: "#FFFFFF",
        secondary: "#CCCCCC",
        green: "#A5D6A7",
        border: "#444444",
      }
    : {
        background: "#F4F0E6",
        card: "#FFFFFF",
        text: "#173B2C",
        secondary: "#666666",
        green: "#2F6B4F",
        border: "#DDDDDD",
      };

  if (!permission) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      />
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={[
          styles.permissaoContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Ionicons
          name="camera-outline"
          size={60}
          color={colors.green}
        />

        <Text
          style={[
            styles.permissaoTitulo,
            {
              color: colors.text,
            },
          ]}
        >
          Acesso à câmera
        </Text>

        <Text
          style={[
            styles.permissaoTexto,
            {
              color: colors.secondary,
            },
          ]}
        >
          Precisamos de acesso à câmera para ler o código de barras.
        </Text>

        <TouchableOpacity
          style={styles.botaoPermissao}
          onPress={requestPermission}
        >
          <Text style={styles.textoBotao}>
            PERMITIR CÂMERA
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function handleBarcodeScanned({
    data,
  }: {
    data: string;
  }) {
    if (scaneado) return;

    setScaneado(true);
    setCodigo(data);

    console.log("Código de barras:", data);
  }

  function voltar() {
    router.back();
  }

  return (
    <View style={styles.container}>
      {/* CÂMERA */}
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={lanterna}
        barcodeScannerSettings={{
          barcodeTypes: [
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
          ],
        }}
        onBarcodeScanned={
          scaneado ? undefined : handleBarcodeScanned
        }
      />

      {/* INTERFACE POR CIMA DA CÂMERA */}
      <View style={styles.overlay}>

        {/* VOLTAR */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={voltar}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* ÁREA DE SCANNER */}
        <View style={styles.areaScanner}>
          <View
            style={[
              styles.canto,
              styles.cantoSuperiorEsquerdo,
              {
                borderColor: colors.green,
              },
            ]}
          />

          <View
            style={[
              styles.canto,
              styles.cantoSuperiorDireito,
              {
                borderColor: colors.green,
              },
            ]}
          />

          <View
            style={[
              styles.canto,
              styles.cantoInferiorEsquerdo,
              {
                borderColor: colors.green,
              },
            ]}
          />

          <View
            style={[
              styles.canto,
              styles.cantoInferiorDireito,
              {
                borderColor: colors.green,
              },
            ]}
          />
        </View>

        {/* INSTRUÇÃO */}
        <Text style={styles.instrucao}>
          Posicione o código de barras{"\n"}
          no centro da câmera.
        </Text>

        {/* RESULTADO */}
        {codigo !== "" && (
          <View
            style={[
              styles.resultado,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text
              style={[
                styles.resultadoTitulo,
                {
                  color: colors.green,
                },
              ]}
            >
              Código encontrado
            </Text>

            <Text
              style={[
                styles.codigo,
                {
                  color: colors.text,
                },
              ]}
            >
              {codigo}
            </Text>
          </View>
        )}

        {/* OPÇÕES */}
        <View style={styles.opcoes}>

          {/* LANTERNA */}
          <TouchableOpacity
            style={styles.opcao}
            onPress={() => setLanterna(!lanterna)}
          >
            <View
              style={[
                styles.iconeOpcao,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name={
                  lanterna
                    ? "flashlight"
                    : "flashlight-outline"
                }
                size={30}
                color={colors.green}
              />
            </View>

            <Text style={styles.textoOpcao}>
              Lanterna
            </Text>
          </TouchableOpacity>

          {/* GALERIA */}
          <TouchableOpacity
            style={styles.opcao}
            onPress={() => {
              console.log("Galeria ainda não implementada");
            }}
          >
            <View
              style={[
                styles.iconeOpcao,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name="images-outline"
                size={30}
                color={colors.green}
              />
            </View>

            <Text style={styles.textoOpcao}>
              Galeria
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  permissaoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  permissaoTitulo: {
    fontSize: 21,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 10,
  },

  permissaoTexto: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 28,
  },

  botaoPermissao: {
    backgroundColor: "#2F6B4F",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoVoltar: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  areaScanner: {
    width: 300,
    height: 190,
    position: "relative",
  },

  canto: {
    position: "absolute",
    width: 45,
    height: 45,
  },

  cantoSuperiorEsquerdo: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 25,
  },

  cantoSuperiorDireito: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 25,
  },

  cantoInferiorEsquerdo: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 25,
  },

  cantoInferiorDireito: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 25,
  },

  instrucao: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 30,
  },

  resultado: {
    position: "absolute",
    bottom: 150,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 200,
  },

  resultadoTitulo: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 5,
  },

  codigo: {
    fontSize: 20,
    fontWeight: "bold",
  },

  opcoes: {
    position: "absolute",
    bottom: 45,
    flexDirection: "row",
    gap: 70,
  },

  opcao: {
    alignItems: "center",
  },

  iconeOpcao: {
    width: 62,
    height: 62,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  textoOpcao: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 7,
  },
});