if (!user || currentView === 'login') {
    return (
      <div className="login-screen-wrapper">
        <LoginView />
        <Modal />
      </div>
    );
  }