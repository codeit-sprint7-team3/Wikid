const CreateWiki = () => {
  return (
    <>
      <form>
        <label>위키 생성하기</label>
        <input name='securityAnswer' placeholder='질문을 입력해 주세요' />
        <input name='securityQuestion' placeholder='답을 입력해 주세요' />
        <button type='submit'>생성하기</button>
      </form>
    </>
  );
};

export default CreateWiki;
