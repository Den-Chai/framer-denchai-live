import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * GITHUB SYNC TEST COMPONENT
 * 
 * If you see this in Framer, the GitHub Link plugin 
 * successfully pulled the file from C:\GitHub\framer-denchai-live!
 */
export default function GitHubSyncTest(props) {
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>✅ GitHub Sync Active</h1>
            <p style={textStyle}>File: {props.fileName}</p>
            <div style={statusBadgeStyle}>
                Connected to C:\GitHub
            </div>
        </div>
    )
}

GitHubSyncTest.defaultProps = {
    fileName: "GitHubSyncTest.tsx",
}

addPropertyControls(GitHubSyncTest, {
    fileName: {
        type: ControlType.String,
        title: "File Name",
    },
})

const containerStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#00d1ff",
    color: "white",
    fontFamily: "sans-serif",
    borderRadius: "20px",
    padding: "20px",
    textAlign: "center",
}

const titleStyle = {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
}

const textStyle = {
    margin: "10px 0",
    opacity: 0.8,
}

const statusBadgeStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "5px 15px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
}
